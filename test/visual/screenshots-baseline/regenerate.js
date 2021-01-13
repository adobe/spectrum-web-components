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
const expect = require('chai').expect;
var rimraf = require('rimraf');
const { startDevServer } = require('@web/dev-server');
const path = require('path');
const fs = require('fs');
const baselineDir = `${process.cwd()}/test/visual/screenshots-baseline`;
const storiesAll = require('../stories');

module.exports = {
    buildScreenshots(
        type,
        color = 'light',
        scale = 'medium',
        dir = 'ltr',
        concurrency = 10
    ) {
        let stories = storiesAll, // storiesAll.splice(0, 8),
            testQueue = [],
            results = [],
            server,
            browser,
            viewport = { width: 800, height: 600 };

        describe('🎁 regenerate screenshots', function () {
            before(async function () {
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
                server = await startDevServer({
                    config: {
                        port: 4444,
                        nodeResolve: true,
                        appIndex: 'index.html',
                        rootDir: path.resolve(
                            process.cwd(),
                            'documentation',
                            'dist',
                            'storybook'
                        ),
                    },
                });
                browser = await playwright[
                    'chromium'
                ].launchPersistentContext(
                    `${baselineDir}/${type}/userDataDir`,
                    { viewport }
                );
                for (let i = 0; i < concurrency; i += 1) {
                    (async () => {
                        const page = await browser.newPage();
                        // prevent hover based inaccuracies in screenshots by
                        // moving the mouse off of the screen before loading tests
                        await page.mouse.move(-5, -5);
                        releasePage(page);
                    })();
                }
                for (let i = 0; i < stories.length; i++) {
                    results.push({
                        test: queueTest(stories[i]),
                    });
                }
            });

            after(async () => {
                await Promise.all([browser.close(), server.stop()]);
            });

            describe('doing it', async function () {
                for (let i = 0; i < stories.length; i++) {
                    it(`capturing: ${stories[i]}`, async function () {
                        await results[i].test;
                        expect(true);
                    });
                }
            });
        });

        function releasePage(page) {
            if (testQueue[0]) {
                testQueue.shift()(page);
            }
        }

        async function availablePage() {
            let resolver;
            const testPromise = new Promise((res) => (resolver = res));
            testQueue.push(resolver);
            return testPromise;
        }

        async function queueTest(story) {
            const page = await availablePage();
            return generateBaselineScreenshots(page, story);
        }

        async function generateBaselineScreenshots(page, story) {
            const url = `http://127.0.0.1:4444/iframe.html?id=${story}&sp_reduceMotion=true&sp_color=${color}&sp_scale=${scale}&sp_dir=${dir}`;
            await page.goto(url, {
                waitUntil: 'networkidle',
            });
            await page.waitForFunction(
                () => !!document.querySelector('#root-inner')
            );
            await page.waitForFunction(
                () => !!document.querySelector('sp-story-decorator')
            );
            await page.waitForFunction(
                () => !!document.querySelector('sp-story-decorator').shadowRoot
            );
            await page.screenshot({
                path: `${baselineDir}/${type}/${story}__${color}__${scale}__${dir}.png`,
            });
            releasePage(page);
        }
    },
};
