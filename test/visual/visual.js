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
const { startDevServer } = require('@web/dev-server');
const path = require('path');
const fs = require('fs');
var rimraf = require('rimraf');
const PNG = require('pngjs').PNG;
const pixelmatch = require('pixelmatch');
const storiesAll = require('./stories');

const currentDir = `${process.cwd()}/test/visual/screenshots-current`;
const baselineDir = `${process.cwd()}/test/visual/screenshots-baseline`;

const PixelDiffThreshold = 0;
const RetryDiffThreshold = 20;

module.exports = {
    checkScreenshots(
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

        describe('👀 page screenshots are correct', function () {
            before(async () => {
                // Prop file system...
                // Create the test directory if needed.
                if (!fs.existsSync(currentDir)) {
                    fs.mkdirSync(currentDir);
                }
                // And it's subdirectories.
                if (!fs.existsSync(`${currentDir}/${type}`)) {
                    fs.mkdirSync(`${currentDir}/${type}`);
                }
                // Create the baseline directory if needed.
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

                // start server and browser
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
                browser = await playwright['chromium'].launchPersistentContext(
                    `${baselineDir}/${type}/userDataDir`,
                    {
                        viewport,
                    }
                );
                browser.on('close', () =>
                    console.log('THE BROWSER CONTEXT CLOSED!!!')
                );
                const tests = [];
                // BEFORE describing what `it` does in mocha:
                // - Collect all tests and run their async parts
                // - Resolve them to direct call methods surfacing success
                for (let i = 0; i < stories.length; i++) {
                    const test = async () => {
                        return {
                            test: await queueTest(stories[i]),
                            title: `${stories[i]}__${color}__${scale}__${dir}`,
                        };
                    };
                    tests.push(test());
                }
                for (let i = 0; i < concurrency; i += 1) {
                    (async () => {
                        await releasePage();
                    })();
                }
                results = await Promise.all(tests);
            });

            after(async () => {
                await Promise.all([browser.close(), server.stop()]);
            });

            describe('default view', function () {
                for (let i = 0; i < stories.length; i++) {
                    it(`${stories[i]}__${color}__${scale}__${dir}`, function () {
                        return results[i].test();
                    });
                }
            });
        });

        async function releasePage(oldPage) {
            if (oldPage) {
                oldPage.close();
            }
            if (testQueue[0]) {
                const test = testQueue.shift();
                const page = await browser.newPage();
                // prevent hover based inaccuracies in screenshots by
                // moving the mouse off of the screen before loading tests
                await page.mouse.move(-5, -5);
                test(page);
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
            return await takeAndCompareScreenshot(page, story);
        }

        //Process methods
        async function takeAndCompareScreenshot(page, test, retry) {
            const testFileName = `${test}__${color}__${scale}__${dir}`;
            const testUrlVars = `id=${test}&sp_reduceMotion=true&sp_color=${color}&sp_scale=${scale}&sp_dir=${dir}`;
            const startMsg = retry
                ? `♻️  ${testFileName} suffered a near miss, retrying.`
                : `🎬 ${testFileName} run started...`;
            console.log(startMsg);
            try {
                await Promise.all([
                    page.waitForResponse('https://use.typekit.net/evk7lzt.css'),
                    page.waitForResponse('https://use.typekit.net/af/**'),
                    page.waitForResponse('https://use.typekit.net/af/**'),
                    page.goto(
                        `http://127.0.0.1:4444/iframe.html?${testUrlVars}`,
                        {
                            waitUntil: 'networkidle',
                        }
                    ),
                ]);
            } catch (error) {
                releasePage(page);
                return Promise.resolve(() => {
                    const msg = `⏱ ${testFileName} failed to load in 30s. URL vars: ${testUrlVars}`;
                    console.log(msg);
                    expect(true, msg).to.equal(false);
                });
            }
            try {
                await page.waitForFunction(
                    () =>
                        !!document.querySelector('sp-story-decorator') &&
                        !!document.querySelector('sp-story-decorator').ready
                );
                await page.screenshot({
                    path: `${currentDir}/${type}/${testFileName}.png`,
                });
                if (
                    !fs.existsSync(`${baselineDir}/${type}/${testFileName}.png`)
                ) {
                    releasePage(page);
                    return Promise.resolve(() => {
                        const msg = `🙅🏼‍♂️ ${testFileName}.png does not have a baseline screenshot.`;
                        console.log(msg);
                        expect(true, msg).to.equal(false);
                    });
                }
                return compareScreenshots(test, page, retry);
            } catch (error) {
                releasePage(page);
                return Promise.resolve(() => {
                    const msg = `🤷‍♀️ ${testFileName} never became ready. Does it exist in the test content? URL vars: ${testUrlVars}`;
                    console.log(msg);
                    expect(true, msg).to.equal(false);
                });
            }
        }

        function compareScreenshots(view, page, retry) {
            return new Promise((resolve, reject) => {
                const testFileName = `${view}__${color}__${scale}__${dir}`;
                const testUrlVars = `id=${view}&sp_reduceMotion=true&sp_color=${color}&sp_scale=${scale}&sp_dir=${dir}`;
                // Note: for debugging, you can dump the screenshotted img as base64.
                // fs.createReadStream(`${currentDir}/${type}/test.png`, { encoding: 'base64' })
                //   .on('data', function (data) {
                //     console.log('got data', data)
                //   })
                //   .on('end', function () {
                //     console.log('\n\n')
                //   });
                const img1 = fs
                    .createReadStream(
                        `${currentDir}/${type}/${testFileName}.png`
                    )
                    .pipe(new PNG())
                    .on('parsed', doneReading);
                const img2 = fs
                    .createReadStream(
                        `${baselineDir}/${type}/${testFileName}.png`
                    )
                    .pipe(new PNG())
                    .on('parsed', doneReading);

                let filesRead = 0;
                async function doneReading() {
                    // Wait until both files are read.
                    if (++filesRead < 2) return;

                    // The files should be the same size.
                    expect(img1.width, 'image widths are the same').equal(
                        img2.width
                    );
                    expect(img1.height, 'image heights are the same').equal(
                        img2.height
                    );

                    // Do the visual diff.
                    const diff = new PNG({
                        width: img1.width,
                        height: img1.height,
                    });

                    const numDiffPixels = pixelmatch(
                        img1.data,
                        img2.data,
                        diff.data,
                        img1.width,
                        img1.height,
                        { threshold: 0 }
                    );
                    const percentDiff =
                        (numDiffPixels / (img1.width * img1.height)) * 100;

                    const stats = fs.statSync(
                        `${currentDir}/${type}/${testFileName}.png`
                    );
                    const fileSizeInBytes = stats.size;

                    if (numDiffPixels > PixelDiffThreshold) {
                        if (numDiffPixels < RetryDiffThreshold && !retry) {
                            const retryResult = await takeAndCompareScreenshot(
                                page,
                                view,
                                true
                            );
                            resolve(retryResult);
                            return;
                        }
                        diff.pack().pipe(
                            fs.createWriteStream(
                                `${currentDir}/${testFileName}-diff.png`
                            )
                        );
                    }
                    releasePage(page);
                    resolve(() => {
                        const retryMsg = retry ? ': with retry' : '';
                        console.log(
                            `📸 ${testFileName}.png => ${fileSizeInBytes} bytes, ${percentDiff}% different${retryMsg}`
                        );
                        expect(
                            numDiffPixels,
                            `⚖️ number of different pixels${retryMsg}. URL vars: ${testUrlVars}`
                        ).to.equal(PixelDiffThreshold);
                    });
                }
            });
        }
    },
};
