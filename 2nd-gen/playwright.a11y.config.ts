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

import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
    timeout: 30 * 1000,
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    reporter: [
        ['html', { outputFolder: 'test/playwright-a11y/report' }],
        ['list'],
    ],

    use: {
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        reducedMotion: 'reduce',
    },

    projects: [
        {
            name: '1st-gen',
            testDir: '../1st-gen/',
            testMatch: '**/packages/*/test/**/*.a11y.spec.ts',
            use: {
                ...devices['Desktop Chrome'],
                baseURL: 'http://localhost:8080',
            },
        },
        {
            name: '2nd-gen',
            testDir: './',
            testMatch: '**/packages/swc/components/*/test/**/*.a11y.spec.ts',
            use: {
                ...devices['Desktop Chrome'],
                baseURL: 'http://localhost:6006',
            },
        },
    ],

    webServer: [
        {
            command: 'cd ../1st-gen && yarn storybook',
            port: 8080,
            reuseExistingServer: !process.env.CI,
            timeout: 120 * 1000,
        },
        {
            command: 'cd packages/swc && yarn storybook',
            port: 6006,
            reuseExistingServer: !process.env.CI,
            timeout: 120 * 1000,
        },
    ],
};

export default config;
