/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import { playwrightLauncher } from '@web/test-runner-playwright';
import { visualRegressionPlugin } from '@web/test-runner-visual-regression/plugin';
import fs from 'fs';
import path from 'path';
import fg from 'fast-glob';

const tools = fs
    .readdirSync('tools')
    .filter((dir) => fs.statSync(`tools/${dir}`).isDirectory());

export const packages = fs
    .readdirSync('packages')
    .filter((dir) => fs.statSync(`packages/${dir}`).isDirectory())
    .concat(tools);

const vrtHTML =
    ({ themeVariant, color, scale, dir, reduceMotion, hcm }) =>
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
                defaultThemeVariant: "${themeVariant || ''}",
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
const themeVariants = ['classic', 'express'];
const colors = ['lightest', 'light', 'dark', 'darkest'];
const scales = ['medium', 'large'];
const directions = ['ltr', 'rtl'];
themeVariants.forEach((themeVariant) => {
    colors.forEach((color) => {
        scales.forEach((scale) => {
            directions.forEach((dir) => {
                const reduceMotion = true;
                const testHTML = vrtHTML({
                    themeVariant,
                    color,
                    scale,
                    dir,
                    reduceMotion,
                });
                vrtGroups.push({
                    name: `vrt-${themeVariant}-${color}-${scale}-${dir}`,
                    files: 'packages/*/test/*.test-vrt.js',
                    testRunnerHtml: testHTML,
                    browsers: [
                        playwrightLauncher({
                            product: 'chromium',
                            createBrowserContext: ({ browser }) =>
                                browser.newContext({
                                    ignoreHTTPSErrors: true,
                                }),
                        }),
                    ],
                });
            });
        });
    });
});

vrtGroups = [
    ...vrtGroups,
    ...packages.reduce((acc, pkg) => {
        const skipPkgs = ['bundle', 'modal'];
        if (!skipPkgs.includes(pkg)) {
            acc.push({
                name: `vrt-${pkg}`,
                files: `packages/${pkg}/test/*.test-vrt.js`,
                testRunnerHtml: vrtHTML({
                    reduceMotion: true,
                }),
                browsers: [
                    playwrightLauncher({
                        product: 'chromium',
                        createBrowserContext: ({ browser }) =>
                            browser.newContext({
                                ignoreHTTPSErrors: true,
                            }),
                    }),
                ],
            });
            acc.push({
                name: `vrt-${pkg}-single`,
                files: `packages/${pkg}/test/*.test-vrt.js`,
                testRunnerHtml: vrtHTML({
                    themeVariant: 'spectrum',
                    color: 'light',
                    scale: 'medium',
                    dir: 'ltr',
                    reduceMotion: true,
                }),
                browsers: [
                    playwrightLauncher({
                        product: 'chromium',
                        createBrowserContext: ({ browser }) =>
                            browser.newContext({
                                ignoreHTTPSErrors: true,
                            }),
                    }),
                ],
            });
        }
        return acc;
    }, []),
    {
        name: `vrt-hcm`,
        files: 'packages/*/test/*.test-vrt.js',
        testRunnerHtml: vrtHTML({
            themeVariant: 'spectrum',
            color: 'dark',
            scale: 'medium',
            dir: 'ltr',
            hcm: true,
            reduceMotion: true,
        }),
        browsers: [
            playwrightLauncher({
                product: 'chromium',
                createBrowserContext: ({ browser }) =>
                    browser.newContext({
                        ignoreHTTPSErrors: true,
                    }),
            }),
        ],
    },
];

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

export function watchSWC() {
    return {
        name: 'watch-swc-plugin',
        async serverStart({ fileWatcher }) {
            // register SWC output files to be watched
            const files = await fg('{packages,projects,tools}/**/*.js', {
                ignore: ['**/*.map', '**/*.vrt.js', '**/spectrum-config.js'],
            });
            for (const file of files) {
                fileWatcher.add(process.cwd() + file);
            }
            // Use the following for reviewing the file changes that are reacted to here...
            // fileWatcher.on('change', (path) => {
            //     console.log(`Process change in: ${path}`);
            // });
        },
    };
}
