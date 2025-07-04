/**
 * Copyright 2025 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import {
    a11ySnapshotPlugin,
    sendKeysPlugin,
    setViewportPlugin,
} from '@web/test-runner-commands/plugins';
import { sendMousePlugin } from './test/plugins/send-mouse-plugin.js';
import {
    chromium,
    chromiumWithMemoryTooling,
    chromiumWithMemoryToolingCI,
    configuredVisualRegressionPlugin,
    coverallsChromium,
    firefox,
    packages,
    vrtGroups,
    webkit,
} from './web-test-runner.utils.js';
import { fromRollup } from '@web/dev-server-rollup';
import rollupJson from '@rollup/plugin-json';
import rollupCommonjs from '@rollup/plugin-commonjs';
import { grantPermissionsPlugin } from './test/plugins/grant-permissions-plugin.js';

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
        grantPermissionsPlugin(),
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
        {
            name: 'measureUserAgentSpecificMemory-plugin',
            transform(context) {
                context.set('Cross-Origin-Opener-Policy', 'same-origin');
                context.set('Cross-Origin-Embedder-Policy', 'credentialless');
            },
        },
        setViewportPlugin(),
    ],
    mimeTypes: {
        '**/*.json': 'js',
    },
    nodeResolve: {
        exportConditions: ['browser', 'development'],
    },
    http2: true,
    protocol: 'https:',
    testsFinishTimeout: 60000,
    coverageConfig: {
        report: true,
        reportDir: 'coverage',
        exclude: [
            'packages/*/stories/*',
            'packages/icons-ui/**',
            'packages/icons-workflow/**',
            'test/**',
            '**/test/**',
            'tools/*/stories/*',
            'tools/styles/**',
            '**/node_modules/**',
            // The following files are not used in Chrome where coverage is calculated.
            '**/OverlayNoPopover.*',
            'tools/shared/src/focus-visible.*',
            // Deprecated
            'packages/icons/**',
        ],
        threshold: {
            statements: 98.5,
            /** @todo bump this back to 94.5% once more tests are added */
            branches: 94.46,
            functions: 97,
            lines: 98.5,
        },
    },
    testFramework: {
        config: {
            timeout: 5000,
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
        {
            name: 'overlay-api',
            files: [
                'packages/action-menu/test/*.test.js',
                'packages/dialog/test/*.test.js',
                'packages/menu/test/*.test.js',
                'packages/overlay/test/*.test.js',
                'packages/picker/test/*.test.js',
                'packages/tooltip/test/*.test.js',
            ],
            browsers: [chromium, firefox, webkit],
        },
        {
            name: 'memory',
            files: ['{packages,tools}/**/*-memory.test.js'],
            browsers: [chromiumWithMemoryTooling],
        },
        {
            name: 'memory-ci',
            files: [
                '{packages,tools}/**/*-memory.test.js',
                '!packages/color-area/test/*-memory.test.js',
                '!packages/color-wheel/test/*-memory.test.js',
                '!packages/color-slider/test/*-memory.test.js',
            ],
            browsers: [chromiumWithMemoryToolingCI],
        },
        {
            name: 'unit-ci',
        },
        {
            name: 'no-memory-ci',
            files: [
                '{packages,tools}/**/*.test.js',
                '!{packages,tools}/**/*-memory.test.js',
            ],
        },
        {
            name: 'coveralls-ci',
            files: [
                '{packages,tools}/**/*.test.js',
                '!{packages,tools}/**/*-memory.test.js',
            ],
            browsers: [coverallsChromium],
        },
    ],
    group: 'unit',
    browsers: [firefox, chromiumWithMemoryTooling, webkit],
};
