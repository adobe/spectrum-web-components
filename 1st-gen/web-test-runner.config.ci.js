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

import standard from './web-test-runner.config.js';
import { defaultReporter } from '@web/test-runner';
import { junitReporter } from '@web/test-runner-junit-reporter';

standard.reporters = [
    // Use the default reporter for console logging in the test job.
    defaultReporter(),
    // Use junit reporter for aggregate test success/timing results across jobs.
    junitReporter({
        outputPath: './results/test-results.xml', // default `'./test-results.xml'`
        reportLogs: true, // default `false`
    }),
];

standard.middleware = standard.middleware || [];
standard.middleware.push(async (ctx, next) => {
    await next();
    // permanently cache ALL of the things!
    ctx.set('Cache-Control', 'public, max-age=604800, immutable');
});

standard.testFramework.config.retries = 2;

export default standard;
