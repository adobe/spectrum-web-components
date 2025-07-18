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

import fs from 'fs';
import path from 'path';

import { playwrightLauncher } from '@web/test-runner-playwright';
import { visualRegressionPlugin } from '@web/test-runner-visual-regression/plugin';

// Base browser context config
const baseContext = {
    ignoreHTTPSErrors: true,
    permissions: ['clipboard-read', 'clipboard-write'],
    locale: 'en-US',
};

export const chromium = playwrightLauncher({
    product: 'chromium',
    createBrowserContext: ({ browser }) => browser.newContext(baseContext),
});

export const chromiumWithMemoryTooling = playwrightLauncher({
    product: 'chromium',
    createBrowserContext: ({ browser }) => browser.newContext(baseContext),
    launchOptions: {
        headless: false,
        args: [
            '--js-flags=--expose-gc',
            '--headless=new',
            /**
             * Cause `measureUserAgentSpecificMemory()` to GC immediately,
             * instead of up to 20s later:
             * https://web.dev/articles/monitor-total-page-memory-usage#local_testing
             **/
            '--enable-blink-features=ForceEagerMeasureMemory',
        ],
    },
});

export const chromiumWithMemoryToolingCI = playwrightLauncher({
    product: 'chromium',
    concurrency: 2,
    createBrowserContext: ({ browser }) => browser.newContext(baseContext),
    launchOptions: {
        headless: false,
        args: [
            '--js-flags=--expose-gc',
            '--headless=new',
            /**
             * Cause `measureUserAgentSpecificMemory()` to GC immediately,
             * instead of up to 20s later:
             * https://web.dev/articles/monitor-total-page-memory-usage#local_testing
             **/
            '--enable-blink-features=ForceEagerMeasureMemory',
        ],
    },
});

export const chromiumWithFlags = playwrightLauncher({
    product: 'chromium',
    launchOptions: {
        args: ['--enable-experimental-web-platform-features'],
    },
    createBrowserContext: ({ browser }) => browser.newContext(baseContext),
});

export const firefox = playwrightLauncher({
    product: 'firefox',
    concurrency: 1,
    createBrowserContext: ({ browser }) =>
        browser.newContext({
            ignoreHTTPSErrors: true,
        }),
    launchOptions: {
        firefoxUserPrefs: {
            'toolkit.telemetry.reportingpolicy.firstRun': false,
            'browser.shell.checkDefaultBrowser': false,
            'browser.bookmarks.restore_default_bookmarks': false,
            'dom.disable_open_during_load': false,
            'dom.max_script_run_time': 0,
            'dom.min_background_timeout_value': 10,
            'extensions.autoDisableScopes': 0,
            'extensions.enabledScopes': 15,
            'dom.events.asyncClipboard.readText': true,
            'dom.events.testing.asyncClipboard': true,
        },
    },
});

export const webkit = playwrightLauncher({
    product: 'webkit',
    concurrency: 4,
    createBrowserContext: ({ browser }) =>
        browser.newContext({
            ignoreHTTPSErrors: true,
        }),
});

// Cache package discovery
let _packages = null;
export const getPackages = () => {
    if (_packages === null) {
        const tools = fs
            .readdirSync('tools')
            .filter((dir) => fs.statSync(`tools/${dir}`).isDirectory());

        _packages = fs
            .readdirSync('packages')
            .filter((dir) => fs.statSync(`packages/${dir}`).isDirectory())
            .concat(tools);
    }
    return _packages;
};

export const packages = getPackages();

const vrtHTML =
    ({ systemVariant, color, scale, dir, reduceMotion, hcm }) =>
    (testFramework) =>
        `<!doctype html>
    <html dir=${dir}>
        <head>
            <link rel="preconnect" href="https://use.typekit.net" />
            <link rel="dns-prefetch" href="https://use.typekit.net" />
            <!-- For Adobe Clean font support -->
            <link rel="stylesheet" href="https://use.typekit.net/evk7lzt.css" />
            <style>
                body {
                    margin: 0;
                }
                sp-story-decorator {
                    display: block;
                }
            </style>
        </head>
        <body>
        <script>
            window.__swc_hack_knobs__ = {
                defaultSystemVariant:  "${systemVariant || ''}",
                defaultColor: "${color || ''}",
                defaultScale: "${scale || ''}",
                defaultDirection: "${dir || ''}",
                defaultReduceMotion: ${reduceMotion},
                hcm: ${!!hcm},
            };
        </script>
        <script type="module" src="${testFramework}"></script>
        </body>
    </html>`;

// Simplified VRT groups - only the ones we actually use
const targetVRTCombinations = [
    {
        system: 'spectrum',
        color: 'light',
        scale: 'medium',
        dir: 'ltr',
        hcm: false,
    },
    {
        system: 'spectrum',
        color: 'dark',
        scale: 'large',
        dir: 'rtl',
        hcm: false,
    },
    {
        system: 'express',
        color: 'light',
        scale: 'medium',
        dir: 'ltr',
        hcm: false,
    },
    {
        system: 'express',
        color: 'dark',
        scale: 'large',
        dir: 'rtl',
        hcm: false,
    },
    {
        system: 'spectrum-two',
        color: 'light',
        scale: 'medium',
        dir: 'ltr',
        hcm: false,
    },
    {
        system: 'spectrum-two',
        color: 'dark',
        scale: 'large',
        dir: 'rtl',
        hcm: false,
    },
    {
        system: 'spectrum',
        color: 'dark',
        scale: 'medium',
        dir: 'ltr',
        hcm: true,
    },
    {
        system: 'spectrum-two',
        color: 'dark',
        scale: 'large',
        dir: 'rtl',
        hcm: true,
    },
];

export const vrtGroups = [
    // Only the 6 combinations we need
    ...targetVRTCombinations.map(({ system, color, scale, dir, hcm }) => ({
        name: `${hcm ? 'hcm-' : ''}${system}-${color}-${scale}-${dir}`,
        files: '(packages|tools)/*/test/*.test-vrt.js',
        testRunnerHtml: vrtHTML({
            systemVariant: system,
            color,
            scale,
            dir,
            hcm,
            reduceMotion: true,
        }),
        browsers: [chromium],
    })),
];

// Packages that should be skipped from testing
const skipPkgs = ['bundle', 'icons-ui', 'icons-workflow', 'modal', 'styles'];

// Create per-package groups for easier testing
export const packageGroups = getPackages()
    .filter((pkg) => !skipPkgs.includes(pkg))
    .map((pkg) => ({
        name: pkg, // Use same naming as main config
        files: `{packages,tools}/${pkg}/test/*.test.js`, // Use same pattern as main config
    }));

export const vrtPackageGroups = getPackages()
    .filter((pkg) => !['bundle', 'modal'].includes(pkg)) // VRT has different skip list
    .map((pkg) => ({
        name: `vrt-${pkg}`,
        files: `{packages,tools}/${pkg}/test/*.test-vrt.js`,
        testRunnerHtml: vrtHTML({
            systemVariant: 'spectrum',
            color: 'light',
            scale: 'medium',
            dir: 'ltr',
            reduceMotion: true,
        }),
        browsers: [chromium],
    }));

export const allGroups = [...packageGroups, ...vrtGroups, ...vrtPackageGroups];

export const testGroups = packageGroups;
export const visualGroups = [...vrtGroups, ...vrtPackageGroups];

// Validate VRT configuration
const validateVRTConfig = (config) => {
    const requiredFields = ['systemVariant', 'color', 'scale', 'dir'];
    const missing = requiredFields.filter((field) => !config[field]);

    if (missing.length > 0) {
        throw new Error(
            `Missing required VRT config fields: ${missing.join(', ')}`
        );
    }

    return config;
};

export const configuredVisualRegressionPlugin = () =>
    visualRegressionPlugin({
        update: process.argv.includes('--update-visual-baseline'),
        diffOptions: {
            threshold: 0,
        },
        baseDir: 'test/visual',
        buildCache: true,
        getBaselineName: ({ browser, name }) => {
            const nameParts = name.split(' - ');
            return path.join('screenshots-baseline', browser, ...nameParts);
        },
        getDiffName: ({ browser, name }) => {
            const nameParts = name.split(' - ');
            return path.join(
                'screenshots-actual',
                'diff',
                browser,
                ...nameParts
            );
        },
        getFailedName: ({ browser, name }) => {
            const nameParts = name.split(' - ');
            return path.join(
                'screenshots-actual',
                'updates',
                browser,
                ...nameParts
            );
        },
        failureThresholdType: 'percent',
        failureThreshold: 3,
    });

// Configurable log filters - add more strings here to filter additional messages
const logFilters = [
    'Could not resolve module specifier',
    'in dev mode',
    // Add more filter strings here as needed
];

// Filter noisy browser logs
export const filterBrowserLogs = (log) => {
    const { args } = log;

    // Check if any argument contains a filtered string
    const shouldFilter = args.some((arg) => {
        if (typeof arg !== 'string') return false;

        // Option 1: Simple approach - check against all filters
        return logFilters.some((filter) => arg.includes(filter));

        // Option 2: Type-specific filtering (uncomment to use)
        // const typeSpecificFilters = logTypeFilters[type] || [];
        // return typeSpecificFilters.some(filter => arg.includes(filter));
    });

    // Return false to filter out (hide) the log
    return !shouldFilter;
};
