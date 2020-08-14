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
const playwright = require('playwright');
var rimraf = require('rimraf');
const { createConfig, startServer } = require('es-dev-server');
const path = require('path');
const fs = require('fs');
const baselineDir = `${process.cwd()}/test/visual/screenshots-baseline`;
const stories = require('../stories');

module.exports = {
    buildScreenshots(type, color = 'light', scale = 'medium', dir = 'ltr') {
        describe('🎁 regenerate screenshots', function () {
            let server,
                browser,
                page,
                viewport = { width: 800, height: 600 };

            before(async function () {
                const config = createConfig({
                    port: 4444,
                    nodeResolve: true,
                    appIndex: 'index.hml',
                    rootDir: path.resolve(
                        process.cwd(),
                        'documentation',
                        'dist',
                        'storybook'
                    ),
                });
                ({ server } = await startServer(config));
                // Create the test directory if needed.
                if (!fs.existsSync(baselineDir)) {
                    fs.mkdirSync(baselineDir);
                }
                // And it's subdirectories.
                if (!fs.existsSync(`${baselineDir}/${type}`)) {
                    fs.mkdirSync(`${baselineDir}/${type}`);
                }

                if (fs.existsSync(`${baselineDir}/${type}/userDataDir`)) {
                    rimraf.sync(`${baselineDir}/${type}/userDataDir`);
                }
                fs.mkdirSync(`${baselineDir}/${type}/userDataDir`);
            });

            after(() => {
                browser.close();
                server.close();
            });

            before(async function () {
                browser = await playwright[
                    'chromium'
                ].launchPersistentContext(
                    `${baselineDir}/${type}/userDataDir`,
                    { viewport }
                );
                page = await browser.newPage();
            });

            it('did it', async function () {
                return generateBaselineScreenshots(page);
            });
        });

        async function generateBaselineScreenshots(page) {
            const prefix = type;
            console.log(prefix + '...');
            for (let i = 0; i < stories.length; i++) {
                await page.goto(
                    `http://127.0.0.1:4444/iframe.html?id=${stories[i]}&knob-Color_Theme=${color}&knob-Scale_Theme=${scale}&knob-Text direction_Theme=${dir}`,
                    {
                        waitUntil: 'networkidle',
                    }
                );
                await page.waitForFunction(
                    '!!document.querySelector("sp-theme").shadowRoot'
                );
                await page.screenshot({
                    path: `${baselineDir}/${type}/${stories[i]}__${color}__${scale}__${dir}.png`,
                });
            }
        }
    },
};
