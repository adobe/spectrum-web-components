/*
Copyright 2023 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import { defineConfig, devices } from '@playwright/test';

// Check for UPDATE_SNAPSHOTS env var for visual baseline management
const updateSnapshots = process.env.UPDATE_SNAPSHOTS === 'true';
// Export for use in test files
process.env.UPDATE_VISUAL_SNAPSHOTS = updateSnapshots ? 'true' : 'false';

const baseURL = 'http://localhost:8000';

// Two different import patterns depending on whether we're doing component or e2e testing
// For e2e tests
export default defineConfig({
    testDir: './',
    retries: process.env.CI ? 2 : 0,
    forbidOnly: !!process.env.CI,
    workers: process.env.CI ? 1 : undefined,
    reporter: process.env.CI ? 'html' : 'list',
    // Single template for all assertions
    snapshotPathTemplate: '{testFileDir}/__snapshots__/{arg}{ext}',

    /* Maximum time one test can run for */
    timeout: 30 * 1000,

    use: {
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
    },
    expect: {
        toMatchAriaSnapshot: {
            pathTemplate: '{testFileDir}/__snapshots__/{arg}{ext}',
        },
    },
    projects: [
        {
            name: 'chrome-desktop',
            testMatch: '**/test/**/*.spec.ts',
            use: {
                ...devices['Desktop Chrome'],
                baseURL: baseURL,
                // Take screenshots for visual comparison
                screenshot: {
                    mode: 'on',
                    fullPage: true,
                },
            },
        },
        {
            name: 'firefox-desktop',
            testMatch: '**/test/**/*.spec.ts',
            use: {
                ...devices['Desktop Firefox'],
                baseURL: baseURL,
                // Take screenshots for visual comparison
                screenshot: {
                    mode: 'on',
                    fullPage: true,
                },
            },
        },
        {
            name: 'safari-desktop',
            testMatch: '**/test/**/*.spec.ts',
            use: {
                ...devices['Desktop Safari'],
                baseURL: baseURL,
                // Take screenshots for visual comparison
                screenshot: {
                    mode: 'on',
                    fullPage: true,
                },
            },
        },
        {
            name: 'chrome-mobile',
            testMatch: '**/test/**/*.spec.ts',

            use: {
                ...devices['Pixel 5'],
                baseURL: baseURL,
                // Take screenshots for visual comparison
                screenshot: {
                    mode: 'on',
                    fullPage: true,
                },
            },
        },
        {
            name: 'safari-mobile',
            testMatch: '**/test/**/*.spec.ts',

            use: {
                ...devices['iPhone 12'],
                baseURL: baseURL,
                // Take screenshots for visual comparison
                screenshot: {
                    mode: 'on',
                    fullPage: true,
                },
            },
        },
    ],
    /* Run your local Storybook before starting the tests */
    webServer: {
        command: 'yarn storybook:playwright',
        url: baseURL,
        reuseExistingServer: !process.env.CI,
        timeout: 120 * 1000, // Give it time to start up
    },
});
