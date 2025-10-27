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

import { fromRollup } from '@web/dev-server-rollup';
import rollupAlias from '@rollup/plugin-alias';
import rollupJson from '@rollup/plugin-json';

const alias = fromRollup(rollupAlias);
const json = fromRollup(rollupJson);

// Custom plugin to replace process.env.NODE_ENV in all files
const replaceProcessEnv = () => ({
    name: 'replace-process-env',
    transform(context) {
        if (context.response.is('js')) {
            return {
                body: context.body.replace(
                    /process\.env\.NODE_ENV/g,
                    '"development"'
                ),
            };
        }
    },
});

export default {
    open: false,
    watch: true,
    nodeResolve: {
        exportConditions: ['browser', 'development'],
        moduleDirectories: ['node_modules', 'packages', 'projects', 'tools'],
    },
    mimeTypes: {
        '**/*.json': 'js',
    },
    // in a monorepo you need to set the root dir to resolve modules
    rootDir: '_site',
    plugins: [
        json(),
        replaceProcessEnv(),
        alias({
            entries: [
                {
                    find: '@swc-packages-internal',
                    replacement: '/__wds-outside-root__/3/packages',
                },
            ],
        }),
    ],
};
