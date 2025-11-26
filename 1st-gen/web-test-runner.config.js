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

import rollupCommonjs from '@rollup/plugin-commonjs';
import rollupJson from '@rollup/plugin-json';
import rollupAlias from '@rollup/plugin-alias';
import rollupReplace from '@rollup/plugin-replace';
import { fromRollup } from '@web/dev-server-rollup';
import {
    a11ySnapshotPlugin,
    sendKeysPlugin,
    setViewportPlugin,
} from '@web/test-runner-commands/plugins';
import { grantPermissionsPlugin } from './test/plugins/grant-permissions-plugin.js';
import { sendMousePlugin } from './test/plugins/send-mouse-plugin.js';
import {
    byFile,
    byPackageOrTool,
    chromium,
    chromiumWithMemoryTooling,
    configuredVisualRegressionPlugin,
    filterBrowserLogs,
    firefox,
    vrtGroups,
    webkit,
} from './web-test-runner.utils.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const commonjs = fromRollup(rollupCommonjs);
const json = fromRollup(rollupJson);
const alias = fromRollup(rollupAlias);
const replace = fromRollup(rollupReplace);

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
        alias({
            entries: [
                {
                    find: /^@spectrum-web-components\/core\/(.*)$/,
                    replacement: path.resolve(
                        __dirname,
                        '../2nd-gen/packages/core/dist/$1'
                    ),
                },
            ],
        }),
        replace({
            'process.env.NODE_ENV': JSON.stringify('development'),
            preventAssignment: true,
        }),
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
        moduleDirectories: ['node_modules', 'packages', 'projects', 'tools'],
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
            statements: 98.4,
            /** @todo bump this back to 94.5% once more tests are added */
            branches: 94.3,
            functions: 97,
            lines: 98.4,
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
            files: [
                '{packages,tools}/**/*.test.js',
                '!{packages,tools}/**/*-memory.test.js',
            ],
        },
        ...vrtGroups,
        ...byPackageOrTool,
        ...byFile,
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
                '!packages/color-*/test/*-memory.test.js',
                '!tools/grid/test/*-memory.test.js',
            ],
            browsers: [chromiumWithMemoryTooling],
        },
        {
            // This is an empty group with no files for the CI to run the unit tests in parallel as a workaround for the fact that we set a default group of 'unit' which has files defined.
            name: 'unit-ci',
        },
    ],
    group: 'unit',
    browsers: [firefox, chromium, webkit],
    filterBrowserLogs,
};
