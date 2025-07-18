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

import { defaultReporter } from '@web/test-runner';
import { junitReporter } from '@web/test-runner-junit-reporter';
import standard from './web-test-runner.config.js';

// Add CI-specific settings that VRT needs
standard.reporters = [
    defaultReporter(),
    junitReporter({
        outputPath: './results/test-results.xml',
        reportLogs: true,
    }),
];

standard.middleware = standard.middleware || [];
standard.middleware.push(async (ctx, next) => {
    await next();
    ctx.set('Cache-Control', 'public, max-age=604800, immutable');
});

// VRT-specific settings
standard.concurrency = 4;
standard.testsFinishTimeout = 200000;
standard.testFramework.config.timeout = 100000;
standard.testFramework.config.retries = 0;

export default standard;
