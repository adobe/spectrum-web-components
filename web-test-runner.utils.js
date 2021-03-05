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
const { playwrightLauncher } = require('@web/test-runner-playwright');
const {
    visualRegressionPlugin,
} = require('@web/test-runner-visual-regression/plugin');
const fs = require('fs');
const path = require('path');

const packages = fs
    .readdirSync('packages')
    .filter((dir) => fs.statSync(`packages/${dir}`).isDirectory());

const vrtHTML = ({ color, scale, dir, reduceMotion }) => (testFramework) =>
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
                    display:block;
                }
            </style>
        </head>
        <body>
        <script>
            window.__swc_hack_knobs__ = {
                defaultColor: "${color}",
                defaultScale: "${scale}",
                defaultDirection: "${dir}",
                defaultReduceMotion: ${reduceMotion},
            };
        </script>
        <script type="module" src="${testFramework}"></script>
        </body>
    </html>`;

const vrtGroups = [];
const colors = ['lightest', 'light', 'dark', 'darkest'];
const scales = ['medium', 'large'];
const directions = ['ltr', 'rtl'];
colors.forEach((color) => {
    scales.forEach((scale) => {
        directions.forEach((dir) => {
            const reduceMotion = true;
            const testHTML = vrtHTML({
                color,
                scale,
                dir,
                reduceMotion,
            });
            vrtGroups.push({
                name: `vrt-${color}-${scale}-${dir}`,
                files: 'test/visual/test.js',
                testRunnerHtml: testHTML,
                browsers: [playwrightLauncher({ product: 'chromium' })],
            });
        });
    });
});

const configuredVisualRegressionPlugin = () =>
    visualRegressionPlugin({
        update: process.argv.includes('--update-visual-baseline'),
        diffOptions: {
            threshold: 0,
        },
        baseDir: 'test/visual',
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

module.exports = {
    packages,
    vrtGroups,
    configuredVisualRegressionPlugin,
};
