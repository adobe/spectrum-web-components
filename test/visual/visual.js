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
const Timeout = 30000;

module.exports = {
    checkScreenshots(
        type,
        color = 'light',
        scale = 'medium',
        dir = 'ltr',
        concurrency = 10
    ) {
        let stories = storiesAll, // .splice(0, 8),
            testQueue = [],
            results = [],
            server,
            browser,
            viewport = { width: 800, height: 600 },
            browserStartingPromise;

        async function startBrowserContext() {
            if (browserStartingPromise) {
                await browserStartingPromise;
                return browser;
            }
            let resolveBroserStartingPromise;
            browserStartingPromise = new Promise(
                (resolve) => (resolveBroserStartingPromise = resolve)
            );
            if (browser) {
                await browser.close();
            }
            browser = await playwright['chromium'].launchPersistentContext(
                `${baselineDir}/${type}/userDataDir`,
                {
                    viewport,
                }
            );
            console.log('THE BROWSER CONTEXT STARTED!!!');
            browser.setDefaultTimeout(Timeout);
            browser.on('close', () =>
                console.log('THE BROWSER CONTEXT CLOSED!!!')
            );
            browser.route('https://use.typekit.net/evk7lzt.css', (route) => {
                route.fulfill({
                    path: './test/visual/typekit/styles.css',
                });
            });
            browser.route(
                'https://use.typekit.net/af/74ffb1/000000000000000000017702/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=i4&v=3',
                (route) => {
                    route.fulfill({
                        path:
                            './test/visual/typekit/adobe-clean-italic-400.woff2',
                    });
                }
            );
            browser.route(
                'https://use.typekit.net/af/cb695f/000000000000000000017701/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3',
                (route) => {
                    route.fulfill({
                        path:
                            './test/visual/typekit/adobe-clean-normal-400.woff2',
                    });
                }
            );
            browser.route(
                'https://use.typekit.net/af/2468ba/00000000000000003b9ada96/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n5&v=3',
                (route) => {
                    route.fulfill({
                        path:
                            './test/visual/typekit/adobe-clean-normal-500.woff2',
                    });
                }
            );
            browser.route(
                'https://use.typekit.net/af/eaf09c/000000000000000000017703/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3',
                (route) => {
                    route.fulfill({
                        path:
                            './test/visual/typekit/adobe-clean-normal-700.woff2',
                    });
                }
            );
            resolveBroserStartingPromise();
            browserStartingPromise = undefined;
        }

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
                fs.copyFile(
                    path.resolve(process.cwd(), 'documentation', 'favicon.ico'),
                    path.resolve(
                        process.cwd(),
                        'documentation',
                        'dist',
                        'storybook',
                        'favicon.ico'
                    ),
                    () => {}
                );

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
                        plugins: [
                            {
                                name: 'make-preload-modulepreload',
                                transform(context) {
                                    if (context.response.is('html')) {
                                        return {
                                            body: context.body.replace(
                                                '<link rel="preload" href="./384751b7.js" as="script" crossorigin="anonymous">',
                                                ''
                                            ),
                                        };
                                    }
                                    if (context.response.is('json')) {
                                        return {
                                            body: JSON.stringify({}),
                                        };
                                    }
                                },
                            },
                        ],
                    },
                });
                await startBrowserContext();
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

        async function acquirePage() {
            if (browserStartingPromise) {
                await browserStartingPromise;
            }
            let page;
            try {
                page = await browser.newPage();
            } catch (error) {
                try {
                    if (browserStartingPromise) {
                        await browserStartingPromise;
                    } else {
                        await startBrowserContext();
                    }
                    page = await browser.newPage();
                } catch (error) {
                    console.log(
                        '🥺 unable to acquire an active browser context.'
                    );
                }
            }
            return page;
        }

        async function releasePage(oldPage) {
            if (oldPage) {
                oldPage.close();
            }
            if (testQueue[0]) {
                const test = testQueue.shift();
                const page = await acquirePage();
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
            let crashedOrClosedorErrored = false;
            if (!page || page.isClosed()) {
                page = await acquirePage();
            }
            page.on('crash', () => {
                crashedOrClosedorErrored = 'crashed';
            });
            page.on('close', () => {
                crashedOrClosedorErrored = 'closed';
            });
            page.on('pageerror', () => {
                crashedOrClosedorErrored = 'errored';
            });
            const testFileName = `${test}__${color}__${scale}__${dir}`;
            const testUrlVars = `id=${test}&sp_reduceMotion=true&sp_color=${color}&sp_scale=${scale}&sp_dir=${dir}`;
            const retryMessage =
                typeof retry === 'string'
                    ? `♻️  ${testFileName} suffered a timeout, retrying.`
                    : `♻️  ${testFileName} suffered a near miss, retrying.`;
            const startMsg = retry
                ? retryMessage
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
                if (retry !== 'timeout') {
                    page = await acquirePage();
                    return takeAndCompareScreenshot(page, test, 'timeout');
                }
                if (crashedOrClosedorErrored) {
                    console.log(
                        `💥 ${testFileName} had it's page ${crashedOrClosedorErrored}.`
                    );
                    page = await acquirePage();
                    return takeAndCompareScreenshot(page, test);
                }
                releasePage(page);
                return Promise.resolve(() => {
                    const msg = `⏱ ${testFileName} failed to load in ${
                        (Timeout / 1000) * 2
                    }s. URL vars: ${testUrlVars}`;
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
                if (crashedOrClosedorErrored === 'errored') {
                    console.log(
                        `💥 ${testFileName} had an uncaught exception.`
                    );
                    return takeAndCompareScreenshot(page, test);
                }
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
                if (retry !== 'ready') {
                    page = await acquirePage();
                    return takeAndCompareScreenshot(page, test, 'ready');
                }
                if (crashedOrClosedorErrored) {
                    console.log(
                        `💥 ${testFileName} had it's page ${crashedOrClosedorErrored}.`
                    );
                    page = await acquirePage();
                    return takeAndCompareScreenshot(page, test);
                }
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
                        { threshold: 0.004 }
                    );
                    const percentDiff =
                        (numDiffPixels / (img1.width * img1.height)) * 100;

                    const stats = fs.statSync(
                        `${currentDir}/${type}/${testFileName}.png`
                    );
                    const fileSizeInBytes = stats.size;

                    if (numDiffPixels > PixelDiffThreshold) {
                        if (
                            numDiffPixels < RetryDiffThreshold &&
                            (!retry || typeof retry === 'string')
                        ) {
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
