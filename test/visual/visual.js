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
const expect = require('chai').expect;
const { startServer } = require('polyserve');
const path = require('path');
const fs = require('fs');
var rimraf = require('rimraf');
const PNG = require('pngjs').PNG;
const pixelmatch = require('pixelmatch');
const stories = require('./stories');

const currentDir = `${process.cwd()}/test/visual/screenshots-current`;
const baselineDir = `${process.cwd()}/test/visual/screenshots-baseline`;

const PixelDiffThreshold = 0;

module.exports = {
    checkScreenshots(type) {
        describe('👀 page screenshots are correct', function() {
            let polyserve, browser, page;

            before(async function() {
                polyserve = await startServer({
                    port: 4444,
                    root: path.join(
                        __dirname,
                        '../../documentation/dist/storybook'
                    ),
                    moduleResolution: 'node',
                });
                // Create the test directory if needed.
                if (!fs.existsSync(currentDir)) {
                    fs.mkdirSync(currentDir);
                }
                // And it's subdirectories.
                if (!fs.existsSync(`${currentDir}/${type}`)) {
                    fs.mkdirSync(`${currentDir}/${type}`);
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

            describe('default view', function() {
                beforeEach(async function() {
                    return page.setViewport({ width: 800, height: 600 });
                });

                for (let i = 0; i < stories.length; i++) {
                    it(stories[i], async function() {
                        return takeAndCompareScreenshot(page, stories[i]);
                    });
                }
            });
        });

        async function takeAndCompareScreenshot(page, test) {
            await page.goto(`http://127.0.0.1:4444/iframe.html?id=${test}`, {
                waitUntil: 'networkidle0',
            });
            await page.hover('sp-theme');
            await page.screenshot({
                path: `${currentDir}/${type}/${test}.png`,
            });
            return compareScreenshots(test);
        }

        function compareScreenshots(view) {
            return new Promise((resolve, reject) => {
                // Note: for debugging, you can dump the screenshotted img as base64.
                // fs.createReadStream(`${currentDir}/${type}/test.png`, { encoding: 'base64' })
                //   .on('data', function (data) {
                //     console.log('got data', data)
                //   })
                //   .on('end', function () {
                //     console.log('\n\n')
                //   });
                const img1 = fs
                    .createReadStream(`${currentDir}/${type}/${view}.png`)
                    .pipe(new PNG())
                    .on('parsed', doneReading);
                const img2 = fs
                    .createReadStream(`${baselineDir}/${type}/${view}.png`)
                    .pipe(new PNG())
                    .on('parsed', doneReading);

                let filesRead = 0;
                function doneReading() {
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
                        `${currentDir}/${type}/${view}.png`
                    );
                    const fileSizeInBytes = stats.size;
                    console.log(
                        `📸 ${view}.png => ${fileSizeInBytes} bytes, ${percentDiff}% different`
                    );

                    if (numDiffPixels > PixelDiffThreshold) {
                        diff.pack().pipe(
                            fs.createWriteStream(
                                `${currentDir}/${view}-diff.png`
                            )
                        );
                    }
                    expect(
                        numDiffPixels,
                        'number of different pixels'
                    ).to.equal(PixelDiffThreshold);
                    resolve();
                }
            });
        }
    },
};
