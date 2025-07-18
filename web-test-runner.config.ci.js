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
import { fromRollup } from '@web/dev-server-rollup';
import { defaultReporter } from '@web/test-runner';
import {
    a11ySnapshotPlugin,
    sendKeysPlugin,
    setViewportPlugin,
} from '@web/test-runner-commands/plugins';
import { junitReporter } from '@web/test-runner-junit-reporter';
import { grantPermissionsPlugin } from './test/plugins/grant-permissions-plugin.js';
import { sendMousePlugin } from './test/plugins/send-mouse-plugin.js';
import { filterBrowserLogs } from './web-test-runner.utils.js';

const commonjs = fromRollup(rollupCommonjs);
const json = fromRollup(rollupJson);

export default {
    // Remove hardcoded files and groups - respect --files argument
    files: [],

    // Include ALL the plugins from main config
    plugins: [
        commonjs({
            requireReturnsDefault: 'preferred',
            include: ['**/node_modules/@formatjs/intl-numberformat/**/*.js'],
        }),
        sendKeysPlugin(),
        sendMousePlugin(),
        grantPermissionsPlugin(),
        a11ySnapshotPlugin(), // ← Add this
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
        setViewportPlugin(), // ← Add this
    ],

    // MIME types
    mimeTypes: { '**/*.json': 'js' },

    nodeResolve: {
        exportConditions: ['browser', 'development'],
    },

    preserveSymlinks: true,

    reporters: [
        defaultReporter(),
        junitReporter({
            outputPath: './results/test-results.xml',
            reportLogs: true,
        }),
    ],

    middleware: [
        async (ctx, next) => {
            await next();
            ctx.set('Cache-Control', 'public, max-age=604800, immutable');
        },
    ],

    testFramework: {
        config: {
            retries: 2,
        },
    },

    // Use centralized log filtering
    filterBrowserLogs,
};
