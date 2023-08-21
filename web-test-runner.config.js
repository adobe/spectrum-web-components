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
    chromiumWithFlags,
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
            requireReturnsDefault: 'preferred',
            include: ['**/node_modules/@formatjs/intl-numberformat/**/*.js'],
        }),
        sendKeysPlugin(),
        sendMousePlugin(),
        a11ySnapshotPlugin(),
        configuredVisualRegressionPlugin(),
        json({}),
        {
            name: 'plugin-js-buffer-to-string',
            transform(context) {
                if (
                    context.response.is('js') &&
                    Buffer.isBuffer(context.body)
                ) {
                    context.body = context.body.toString();
                }
            },
        },
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
            // The following are WIP removals for the Overlay API update
            '**/ActiveOverlay.*',
            '**/overlay-stack.*',
            '**/overlay-utils.*',
            '**/OverlayPopover.*',
        ],
        threshold: {
            statements: 98.5,
            branches: 95.5,
            functions: 96.5,
            lines: 98.5,
        },
    },
    testFramework: {
        config: {
            timeout: 3000,
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
        {
            name: 'overlay-api',
            files: [
                'packages/action-menu/test/*.test.js',
                'packages/dialog/test/*.test.js',
                'packages/menu/test/*.test.js',
                'packages/overlay/test/*.test.js',
                'packages/picker/test/*.test.js',
                'packages/split-button/test/*.test.js',
                'packages/tooltip/test/*.test.js',
            ],
            browsers: [chromium, chromiumWithFlags, firefox, webkit],
        },
    ],
    group: 'unit',
    browsers: [chromium, firefox, webkit],
};
