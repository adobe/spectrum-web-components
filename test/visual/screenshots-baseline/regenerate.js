/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
const puppeteer = require('puppeteer');
var rimraf = require('rimraf');
const { startServer } = require('polyserve');
const path = require('path');
const fs = require('fs');
const baselineDir = `${process.cwd()}/test/visual/screenshots-baseline`;
const stories = require('../stories');

module.exports = {
    buildScreenshots(type, color = 'light', scale = 'medium') {
        describe('🎁 regenerate screenshots', function() {
            let polyserve, browser, page;

            before(async function() {
                polyserve = await startServer({
                    port: 4444,
                    root: path.join(
                        __dirname,
                        '../../../documentation/dist/storybook'
                    ),
                    moduleResolution: 'node',
                });
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

            after((done) => polyserve.close(done));

            beforeEach(async function() {
                browser = await puppeteer.launch({
                    userDataDir: `${baselineDir}/${type}/userDataDir`,
                });
                page = await browser.newPage();
            });

            afterEach(() => browser.close());

            it('did it', async function() {
                return generateBaselineScreenshots(page);
            });
        });

        async function generateBaselineScreenshots(page) {
            const prefix = type;
            console.log(prefix + '...');
            page.setViewport({ width: 800, height: 600 });

            for (let i = 0; i < stories.length; i++) {
                await page.goto(
                    `http://127.0.0.1:4444/iframe.html?id=${stories[i]}&knob-Color_Theme=${color}&knob-Scale_Theme=${scale}`,
                    {
                        waitUntil: 'networkidle0',
                    }
                );
                await page.screenshot({
                    path: `${baselineDir}/${type}/${stories[i]}__${color}__${scale}.png`,
                });
            }
        }
    },
};
