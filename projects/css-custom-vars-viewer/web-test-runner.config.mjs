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

// import { playwrightLauncher } from '@web/test-runner-playwright';

const filteredLogs = ['Running in dev mode', 'lit-html is in dev mode'];

export default /** @type {import("@web/test-runner").TestRunnerConfig} */ ({
    /** Test files to run */
    files: 'dist/test/**/*.test.js',

    /** Resolve bare module imports */
    nodeResolve: {
        exportConditions: ['browser', 'development'],
    },

    /** Filter out lit dev mode logs */
    filterBrowserLogs(log) {
        for (const arg of log.args) {
            if (
                typeof arg === 'string' &&
                filteredLogs.some(l => arg.includes(l))
            ) {
                return false;
            }
        }
        return true;
    },

    /** Compile JS for older browsers. Requires @web/dev-server-esbuild plugin */
    // esbuildTarget: 'auto',

    /** Amount of browsers to run concurrently */
    // concurrentBrowsers: 2,

    /** Amount of test files per browser to test concurrently */
    // concurrency: 1,

    /** Browsers to run tests on */
    // browsers: [
    //   playwrightLauncher({ product: 'chromium' }),
    //   playwrightLauncher({ product: 'firefox' }),
    //   playwrightLauncher({ product: 'webkit' }),
    // ],

    // See documentation for all available options
});
