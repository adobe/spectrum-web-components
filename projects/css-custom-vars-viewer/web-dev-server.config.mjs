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

import rollupJson from '@rollup/plugin-json';
import { fromRollup } from '@web/dev-server-rollup';

/** Use Hot Module replacement by adding --hmr to the start command */
const hmr = process.argv.includes('--hmr');
const json = fromRollup(rollupJson);

export default /** @type {import('@web/dev-server').DevServerConfig} */ ({
    open: '/demo/',
    mimeTypes: {
        '**/*.json': 'js',
    },
    /** Use regular watch mode if HMR is not enabled. */
    watch: !hmr,
    /** Resolve bare module imports */
    nodeResolve: {
        exportConditions: ['browser', 'development'],
    },

    /** Compile JS for older browsers. Requires @web/dev-server-esbuild plugin */
    // esbuildTarget: 'auto'

    /** Set appIndex to enable SPA routing */
    // appIndex: 'demo/index.html',

    plugins: [
        /** Use Hot Module Replacement by uncommenting. Requires @open-wc/dev-server-hmr plugin */
        // hmr && hmrPlugin({ exclude: ['**/*/node_modules/**/*'], presets: [presets.litElement] }),
        json(),
    ],
    // See documentation for all available options
});
