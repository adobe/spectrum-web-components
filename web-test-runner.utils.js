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

export const chromium = playwrightLauncher({
    product: 'chromium',
    createBrowserContext: ({ browser }) =>
        browser.newContext({
            ignoreHTTPSErrors: true,
            permissions: ['clipboard-read', 'clipboard-write'],
            locale: 'en-US',
        }),
});

export const chromiumWithMemoryTooling = playwrightLauncher({
    product: 'chromium',
    createBrowserContext: ({ browser }) =>
        browser.newContext({
            ignoreHTTPSErrors: true,
            permissions: ['clipboard-read', 'clipboard-write'],
            locale: 'en-US',
        }),
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
        channel: 'chromium',
        args: ['--enable-experimental-web-platform-features', '--lang=en-US'],
    },
    createBrowserContext: ({ browser }) =>
        browser.newContext({
            ignoreHTTPSErrors: true,
            permissions: ['clipboard-read', 'clipboard-write'],
            locale: 'en-US',
        }),
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
            // Enable tab navigation to all focusable elements in Firefox
            'accessibility.tabfocus': 7, // Focus links, form controls, and other elements
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

export let vrtGroups = [];
const systemVariants = ['spectrum', 'express', 'spectrum-two'];
const colors = ['light', 'dark'];
const scales = ['medium', 'large'];
const directions = ['ltr', 'rtl'];
systemVariants.forEach((systemVariant) => {
    colors.forEach((color) => {
        scales.forEach((scale) => {
            directions.forEach((dir) => {
                const reduceMotion = true;
                const testHTML = vrtHTML({
                    systemVariant,
                    color,
                    scale,
                    dir,
                    reduceMotion,
                });
                vrtGroups.push({
                    name: `vrt-${systemVariant}-${color}-${scale}-${dir}`,
                    files: '(packages|tools)/*/test/*.test-vrt.js',
                    testRunnerHtml: testHTML,
                    browsers: [chromium],
                });
            });
        });
    });
});

vrtGroups = [
    ...vrtGroups,
    {
        name: `vrt-hcm`,
        files: '(packages|tools)/*/test/*.test-vrt.js',
        testRunnerHtml: vrtHTML({
            systemVariant: 'spectrum',
            color: 'dark',
            scale: 'medium',
            dir: 'ltr',
            hcm: true,
            reduceMotion: true,
        }),
        browsers: [chromium],
    },
];

const tools = fs
    .readdirSync('tools')
    .filter((dir) => fs.statSync(`tools/${dir}`).isDirectory());

export const packages = fs
    .readdirSync('packages')
    .filter((dir) => fs.statSync(`packages/${dir}`).isDirectory())
    .concat(tools);

export const byPackageOrTool = packages.reduce((acc, pkg) => {
    const isTool = tools.includes(pkg);
    const testDir = isTool ? `tools/${pkg}/test` : `packages/${pkg}/test`;
    // Check if the package has a test directory
    try {
        if (fs.statSync(testDir).isDirectory()) {
            // Unit tests for current package
            try {
                acc.push({
                    name: pkg,
                    files: `${isTool ? 'tools' : 'packages'}/${pkg}/test/*.test.js`,
                });
            } catch {
                //Directory is missing unit tests, skipping package.
            }

            // VRT tests for current package
            try {
                const vrtFiles = fs
                    .readdirSync(testDir)
                    .filter((file) => file.endsWith('.test-vrt.js'));

                if (vrtFiles.length > 0) {
                    acc.push({
                        name: `vrt-${pkg}`,
                        files: `${isTool ? 'tools' : 'packages'}/${pkg}/test/*.test-vrt.js`,
                        testRunnerHtml: vrtHTML({
                            reduceMotion: true,
                        }),
                        browsers: [chromium],
                    });
                    acc.push({
                        name: `vrt-${pkg}-single`,
                        files: `${isTool ? 'tools' : 'packages'}/${pkg}/test/*.test-vrt.js`,
                        testRunnerHtml: vrtHTML({
                            systemVariant: 'spectrum',
                            color: 'light',
                            scale: 'medium',
                            dir: 'ltr',
                            reduceMotion: true,
                        }),
                        browsers: [chromium],
                    });
                }
            } catch {
                //Directory is missing unit tests, skipping package. leaving for future reference.
            }
        }
    } catch {
        //Directory is missing test directory, skipping package. leaving for future reference.
    }

    return acc;
}, []);

export const byFile = fs
    .readdirSync('.', { withFileTypes: true, recursive: true })
    .reduce((acc, file) => {
        if (file.isFile()) {
            if (file.name.endsWith('.test.js')) {
                acc.push({
                    name: file.parentPath + '/' + file.name,
                    files: file.parentPath + '/' + file.name,
                });
            }
        }
        return acc;
    }, []);

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
    });

export const filterBrowserLogs = (log) => {
    const { type, args } = log;

    // Filter out noisy development messages
    if (
        type === 'warn' &&
        args.some(
            (arg) =>
                typeof arg === 'string' &&
                (arg.includes('Could not resolve module specifier') ||
                    arg.includes('in dev mode') ||
                    arg.includes('slottable-request') ||
                    arg.includes('The Overlay Trigger Directive'))
        )
    ) {
        return false;
    }

    return true;
};
