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

import standard from './web-test-runner.config.ci.js';
import { playwrightLauncher } from '@web/test-runner-playwright';

// Override the chromium browser with VRT-specific flags for stable rendering
const chromiumVRT = playwrightLauncher({
    product: 'chromium',
    createBrowserContext: ({ browser }) =>
        browser.newContext({
            ignoreHTTPSErrors: true,
            permissions: ['clipboard-read', 'clipboard-write'],
            locale: 'en-US',
        }),
    launchOptions: {
        args: [
            '--disable-font-subpixel-positioning',
            '--disable-lcd-text',
            '--force-color-profile=srgb',
            '--force-device-scale-factor=1',
        ],
    },
});

standard.concurrency = 4;
standard.testsFinishTimeout = 200000;
standard.testFramework.config.timeout = 100000;
standard.testFramework.config.retries = 0;

// Replace the browsers array with our VRT-optimized chromium
standard.browsers = [chromiumVRT];

export default standard;
